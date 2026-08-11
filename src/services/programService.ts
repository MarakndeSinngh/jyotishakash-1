import { Program } from '../models/program';
import { supabaseProgramRepository } from '../repositories/supabaseProgramRepository';

export const programService = {
  /**
   * Get all programs
   */
  async getAllPrograms(): Promise<Program[]> {
    return supabaseProgramRepository.getAll();
  },

  /**
   * Get programs by mentor ID
   */
  async getProgramsByMentor(mentorId: string): Promise<Program[]> {
    return supabaseProgramRepository.getByMentor(mentorId);
  },

  /**
   * Get featured programs
   */
  async getFeaturedPrograms(): Promise<Program[]> {
    return supabaseProgramRepository.getFeatured();
  },

  /**
   * Save a new program
   */
  async saveProgram(program: Program): Promise<Program> {
    return supabaseProgramRepository.create(program);
  },

  /**
   * Update an existing program
   */
  async updateProgram(id: string, updates: Partial<Program>): Promise<Program> {
    return supabaseProgramRepository.update(id, updates);
  },

  /**
   * Delete a program by ID
   */
  async deleteProgram(id: string): Promise<boolean> {
    return supabaseProgramRepository.delete(id);
  }
};

