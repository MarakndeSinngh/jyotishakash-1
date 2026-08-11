import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle, CheckCircle2, Download, ArrowRight, RefreshCw } from 'lucide-react';
import { parseTestimonialFile, ImportValidationResult, ParsedTestimonialRow } from '../../utils/testimonialExcel';
import { supabaseTestimonialRepository } from '../../repositories/supabaseTestimonialRepository';

interface TestimonialBulkImportProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingCodes: string[];
}

export default function TestimonialBulkImport({
  isOpen,
  onClose,
  onSuccess,
  existingCodes
}: TestimonialBulkImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<ImportValidationResult | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);
    setValidationResult(null);
    setShowConfirmation(false);
    setImportSuccess(null);

    // Validate extension
    const fileName = selectedFile.name.toLowerCase();
    if (!fileName.endsWith('.xlsx') && !fileName.endsWith('.csv')) {
      setError('Please upload an Excel (.xlsx) or CSV (.csv) file.');
      return;
    }

    // Validate size (10 MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximum allowed size is 10 MB.');
      return;
    }

    setFile(selectedFile);
    try {
      setLoadingMessage('Reading and parsing file...');
      const result = await parseTestimonialFile(selectedFile, existingCodes);
      setValidationResult(result);
      setLoadingMessage(null);
    } catch (err: any) {
      console.error('Error parsing file:', err);
      setError(err?.message || 'Failed to parse file. Please verify file format.');
      setLoadingMessage(null);
    }
  };

  const handleExecuteImport = async () => {
    if (!validationResult || validationResult.hasErrors) return;

    try {
      setIsImporting(true);
      setLoadingMessage('Importing testimonials into database...');

      const rowsToUpsert = validationResult.rows.map(r => ({
        testimonialCode: r.testimonialCode,
        name: r.name,
        role: r.role,
        course: r.course,
        feedback: r.feedback,
        rating: r.rating,
        image: r.image,
        published: r.published,
        displayOrder: r.displayOrder,
        testimonialDate: r.testimonialDate
      }));

      await supabaseTestimonialRepository.upsertMany(rowsToUpsert);

      const newCount = validationResult.rows.filter(r => r.action === 'INSERT').length;
      const updateCount = validationResult.rows.filter(r => r.action === 'UPDATE').length;

      setImportSuccess(`Successfully imported ${validationResult.totalRows} testimonials (${newCount} created, ${updateCount} updated).`);
      setIsImporting(false);
      setLoadingMessage(null);
      setShowConfirmation(false);

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2500);
    } catch (err: any) {
      console.error('Database import error:', err);
      setError(err?.message || 'Database error during bulk import.');
      setIsImporting(false);
      setLoadingMessage(null);
      setShowConfirmation(false);
    }
  };

  const newCount = validationResult?.rows.filter(r => r.status === 'Valid' && r.action === 'INSERT').length || 0;
  const updateCount = validationResult?.rows.filter(r => r.status === 'Valid' && r.action === 'UPDATE').length || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden border border-stone-200 my-8">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold font-cinzel text-stone-900">Bulk Import Testimonials</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isImporting}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {importSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-emerald-900">Import Complete</h4>
              <p className="text-xs text-emerald-700">{importSuccess}</p>
            </div>
          ) : (
            <>
              {/* Upload section & Template Download */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200/60">
                <div className="space-y-1 text-left w-full sm:w-auto">
                  <h4 className="text-xs font-bold text-stone-800">1. Prepare your spreadsheet</h4>
                  <p className="text-[11px] text-stone-500">Download the official Excel template with column instructions.</p>
                </div>
                <a
                  href="#download-template"
                  onClick={(e) => {
                    e.preventDefault();
                    import('../../utils/testimonialExcel').then(m => m.generateTestimonialTemplate());
                  }}
                  className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 rounded-xl text-xs font-medium border border-stone-200 shadow-sm inline-flex items-center gap-2 transition-colors shrink-0"
                >
                  <Download className="w-4 h-4 text-amber-600" />
                  Download Template (.xlsx)
                </a>
              </div>

              {/* File Input */}
              <div className="space-y-2 text-left">
                <label className="block text-xs font-semibold text-stone-700">
                  2. Upload Excel (.xlsx) or CSV (.csv) File
                </label>
                <div className="border-2 border-dashed border-stone-200 hover:border-amber-500 rounded-2xl p-6 text-center transition-colors bg-stone-50/50">
                  <input
                    type="file"
                    accept=".xlsx, .csv"
                    onChange={handleFileChange}
                    disabled={isImporting}
                    className="hidden"
                    id="bulk-file-input"
                  />
                  <label htmlFor="bulk-file-input" className="cursor-pointer space-y-2 block">
                    <Upload className="w-8 h-8 text-stone-400 mx-auto" />
                    <div className="text-xs font-medium text-stone-700">
                      {file ? <span className="text-amber-700 font-bold">{file.name}</span> : 'Click to choose file or drag and drop'}
                    </div>
                    <p className="text-[10px] text-stone-400">Supports .xlsx and .csv files up to 10 MB</p>
                  </label>
                </div>
              </div>

              {loadingMessage && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-xs text-amber-800">
                  <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-amber-600" />
                  <span>{loadingMessage}</span>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Validation Summary & Preview */}
              {validationResult && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Rows</span>
                      <span className="text-base font-bold text-stone-900">{validationResult.totalRows}</span>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 block">New (Insert)</span>
                      <span className="text-base font-bold text-emerald-900">{newCount}</span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <span className="text-[10px] uppercase font-bold text-blue-600 block">Existing (Update)</span>
                      <span className="text-base font-bold text-blue-900">{updateCount}</span>
                    </div>
                    <div className={`p-3 rounded-xl border ${validationResult.hasErrors ? 'bg-red-50 border-red-200' : 'bg-stone-50 border-stone-200'}`}>
                      <span className={`text-[10px] uppercase font-bold block ${validationResult.hasErrors ? 'text-red-600' : 'text-stone-400'}`}>Errors</span>
                      <span className={`text-base font-bold ${validationResult.hasErrors ? 'text-red-900' : 'text-stone-900'}`}>{validationResult.errorRowsCount}</span>
                    </div>
                  </div>

                  {validationResult.hasErrors && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-left space-y-2">
                      <h5 className="text-xs font-bold text-red-800 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" /> Please fix validation errors before importing:
                      </h5>
                      <div className="max-h-36 overflow-y-auto space-y-1">
                        {validationResult.rows.filter(r => r.status === 'Error').map((row, idx) => (
                          <div key={idx} className="text-[11px] text-red-700 bg-white/60 p-2 rounded border border-red-100">
                            <span className="font-semibold">Row {row.rowNumber} (Code: {row.testimonialCode || 'Missing'})</span>: {row.errors.join(' | ')}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preview Table */}
                  <div className="space-y-2 text-left">
                    <h4 className="text-xs font-bold text-stone-800">Preview (First 20 rows)</h4>
                    <div className="border border-stone-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-100 text-stone-600 sticky top-0 border-b border-stone-200">
                          <tr>
                            <th className="p-2.5 font-semibold">Row</th>
                            <th className="p-2.5 font-semibold">Code</th>
                            <th className="p-2.5 font-semibold">Name</th>
                            <th className="p-2.5 font-semibold">Rating</th>
                            <th className="p-2.5 font-semibold">Status</th>
                            <th className="p-2.5 font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {validationResult.rows.slice(0, 20).map((r, i) => (
                            <tr key={i} className={r.status === 'Error' ? 'bg-red-50/50' : 'hover:bg-stone-50'}>
                              <td className="p-2.5 font-mono text-stone-500">{r.rowNumber}</td>
                              <td className="p-2.5 font-mono font-medium text-stone-800">{r.testimonialCode || <span className="text-red-500">Missing</span>}</td>
                              <td className="p-2.5 text-stone-800">{r.name || <span className="text-red-500">Missing</span>}</td>
                              <td className="p-2.5 text-stone-800">{r.rating}★</td>
                              <td className="p-2.5">
                                {r.status === 'Valid' ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-medium">Valid</span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 font-medium" title={r.errors.join(', ')}>Error</span>
                                )}
                              </td>
                              <td className="p-2.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${r.action === 'INSERT' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                                  {r.action}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Confirmation State */}
                  {showConfirmation && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-left space-y-3">
                      <h5 className="text-xs font-bold text-amber-900">Confirm Bulk Import</h5>
                      <p className="text-xs text-amber-800">
                        Import {validationResult.totalRows} testimonials? <span className="font-semibold">{newCount} new records</span> will be created and <span className="font-semibold">{updateCount} existing records</span> will be updated.
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowConfirmation(false)}
                          disabled={isImporting}
                          className="px-3 py-1.5 rounded-lg border border-amber-300 text-amber-800 text-xs font-medium bg-white hover:bg-amber-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleExecuteImport}
                          disabled={isImporting}
                          className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium inline-flex items-center gap-1.5 shadow-sm"
                        >
                          {isImporting ? 'Importing...' : 'Confirm Import'}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-6 border-t border-stone-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isImporting}
            className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-medium hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
          {!importSuccess && validationResult && !validationResult.hasErrors && !showConfirmation && (
            <button
              type="button"
              onClick={() => setShowConfirmation(true)}
              disabled={validationResult.totalRows === 0}
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2 disabled:opacity-50"
            >
              Import {validationResult.totalRows} Testimonials
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
