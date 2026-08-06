import React from 'react';
import { Film, Image as ImageIcon, Upload, Search, Download, Trash2, Play } from 'lucide-react';

export default function MediaLibraryView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">Media Library</h1>
          <p className="text-xs text-stone-500">Manage masterclass videos, YouTube shorts, promotional banners, and assets</p>
        </div>
        <button
          onClick={() => alert('File upload dialog opened.')}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2 self-start"
        >
          <Upload className="w-4 h-4" />
          Upload New Asset
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search media files by name or tag..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Filter:</span>
            <select className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-none">
              <option>All Assets</option>
              <option>Videos (MP4)</option>
              <option>Thumbnails (PNG/JPG)</option>
              <option>PDF Resources</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Masterclass Intro 2026.mp4', type: 'Video', size: '142 MB', date: 'Aug 01, 2026' },
            { title: 'Raajeev Portrait Banner.jpg', type: 'Image', size: '2.4 MB', date: 'July 28, 2026' },
            { title: 'Chaldean Numerology Chart.pdf', type: 'PDF', size: '4.1 MB', date: 'July 25, 2026' },
            { title: 'Shaunak Astro Webinar Clip.mp4', type: 'Video', size: '88 MB', date: 'July 20, 2026' },
            { title: 'Sannjoy Bengali Lo Shu Guide.pdf', type: 'PDF', size: '3.5 MB', date: 'July 18, 2026' },
            { title: 'LEO Academy Gold Emblem.png', type: 'Image', size: '1.1 MB', date: 'July 15, 2026' },
            { title: 'Business Numerology Case Study.mp4', type: 'Video', size: '210 MB', date: 'July 10, 2026' },
            { title: 'Testimonials Carousel BG.jpg', type: 'Image', size: '5.8 MB', date: 'July 05, 2026' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-white hover:border-amber-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                    {item.type === 'Video' ? <Film className="w-5 h-5" /> : item.type === 'Image' ? <ImageIcon className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-stone-200/60 text-stone-700 rounded">
                    {item.type}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 truncate mb-1" title={item.title}>{item.title}</h4>
                <p className="text-[11px] text-stone-400">{item.size} • {item.date}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between">
                <button onClick={() => alert(`Previewing ${item.title}`)} className="text-xs text-amber-700 hover:underline font-medium inline-flex items-center gap-1">
                  <Play className="w-3.5 h-3.5" /> Preview
                </button>
                <div className="flex items-center gap-1">
                  <button onClick={() => alert(`Downloading ${item.title}`)} className="p-1.5 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => alert(`Deleting ${item.title}`)} className="p-1.5 rounded text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
