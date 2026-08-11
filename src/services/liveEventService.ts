import { LiveEvent } from '../models/liveEvent';
import { supabaseLiveEventRepository } from '../repositories/supabaseLiveEventRepository';

export const liveEventService = {
  /**
   * Get all live events
   */
  async getAllLiveEvents(): Promise<LiveEvent[]> {
    return supabaseLiveEventRepository.getAll();
  },

  /**
   * Get live events by mentor ID
   */
  async getLiveEventByMentor(mentorId: string): Promise<LiveEvent[]> {
    return supabaseLiveEventRepository.getByMentor(mentorId);
  },

  /**
   * Save a new live event (create)
   */
  async saveLiveEvent(event: LiveEvent): Promise<LiveEvent> {
    return supabaseLiveEventRepository.create(event);
  },

  /**
   * Update an existing live event
   */
  async updateLiveEvent(id: string, updates: Partial<LiveEvent>): Promise<LiveEvent> {
    return supabaseLiveEventRepository.update(id, updates);
  },

  /**
   * Delete a live event by ID
   */
  async deleteLiveEvent(id: string): Promise<boolean> {
    return supabaseLiveEventRepository.delete(id);
  }
};

