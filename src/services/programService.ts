import { Program } from '../models/program';
import { programRepository } from '../repositories/programRepository';

export const programService = {
  /**
   * Get all programs
   */
  async getAllPrograms(): Promise<Program[]> {
    return programRepository.getAll();
  },

  /**
   * Get programs by mentor ID
   */
  async getProgramsByMentor(mentorId: string): Promise<Program[]> {
    return programRepository.getByMentor(mentorId);
  },

  /**
   * Get featured programs
   */
  async getFeaturedPrograms(): Promise<Program[]> {
    return programRepository.getFeatured();
  },

  /**
   * Save a new program
   */
  async saveProgram(program: Program): Promise<Program> {
    return programRepository.create(program);
  },

  /**
   * Update an existing program
   */
  async updateProgram(id: string, updates: Partial<Program>): Promise<Program> {
    return programRepository.update(id, updates);
  },

  /**
   * Delete a program by ID
   */
  async deleteProgram(id: string): Promise<boolean> {
    return programRepository.delete(id);
  }
};
