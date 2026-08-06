import { Faculty } from '../models/faculty';
import { facultyRepository } from '../repositories/facultyRepository';

export const facultyService = {
  /**
   * Get all faculty members
   */
  async getAllFaculty(): Promise<Faculty[]> {
    return facultyRepository.getAll();
  },

  /**
   * Get faculty member by ID
   */
  async getFacultyById(id: string): Promise<Faculty | null> {
    return facultyRepository.getById(id);
  },

  /**
   * Get founder faculty member
   */
  async getFounder(): Promise<Faculty | null> {
    return facultyRepository.getFounder();
  },

  /**
   * Save a new faculty member (create)
   */
  async saveFaculty(faculty: Faculty): Promise<Faculty> {
    return facultyRepository.create(faculty);
  },

  /**
   * Update an existing faculty member
   */
  async updateFaculty(id: string, updates: Partial<Faculty>): Promise<Faculty> {
    return facultyRepository.update(id, updates);
  },

  /**
   * Delete a faculty member by ID
   */
  async deleteFaculty(id: string): Promise<boolean> {
    return facultyRepository.delete(id);
  }
};
