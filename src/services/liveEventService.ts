import { LiveEvent } from '../models/liveEvent';
import { liveEventRepository } from '../repositories/liveEventRepository';

export const liveEventService = {
  /**
   * Get all live events
   */
  async getAllLiveEvents(): Promise<LiveEvent[]> {
    return liveEventRepository.getAll();
  },

  /**
   * Get live events by mentor ID
   */
  async getLiveEventByMentor(mentorId: string): Promise<LiveEvent[]> {
    return liveEventRepository.getByMentor(mentorId);
  },

  /**
   * Save a new live event (create)
   */
  async saveLiveEvent(event: LiveEvent): Promise<LiveEvent> {
    return liveEventRepository.create(event);
  },

  /**
   * Update an existing live event
   */
  async updateLiveEvent(id: string, updates: Partial<LiveEvent>): Promise<LiveEvent> {
    return liveEventRepository.update(id, updates);
  },

  /**
   * Delete a live event by ID
   */
  async deleteLiveEvent(id: string): Promise<boolean> {
    return liveEventRepository.delete(id);
  }
};
