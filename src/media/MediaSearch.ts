import { MediaItem, SearchResult } from './MediaTypes';

/**
 * Highly responsive localized search engine that parses keywords
 * and scores results based on matching fields.
 */
export function searchMediaLibrary(items: MediaItem[], query: string): SearchResult[] {
  if (!query || query.trim() === "") {
    return items.map(item => ({ item, score: 1, matchFields: [] }));
  }

  const cleanQuery = query.toLowerCase().trim();
  const queryWords = cleanQuery.split(/\s+/);

  const results: SearchResult[] = [];

  for (const item of items) {
    let score = 0;
    const matchFields: string[] = [];

    const title = (item.title || "").toLowerCase();
    const category = (item.category || "").toLowerCase();
    const desc = (item.description || "").toLowerCase();
    const speaker = (item.speaker || "").toLowerCase();
    const instructor = (item.instructor || "").toLowerCase();
    const tags = (item.tags || []).map(t => t.toLowerCase());

    // exact title match gets highest score
    if (title.includes(cleanQuery)) {
      score += 10;
      matchFields.push("title");
    }

    // speaker/instructor exact match gets second highest
    if (speaker && speaker.includes(cleanQuery)) {
      score += 8;
      matchFields.push("speaker");
    }
    if (instructor && instructor.includes(cleanQuery)) {
      score += 8;
      matchFields.push("instructor");
    }

    // category exact match
    if (category && category.includes(cleanQuery)) {
      score += 6;
      matchFields.push("category");
    }

    // tag matches
    for (const tag of tags) {
      if (tag === cleanQuery) {
        score += 5;
        matchFields.push("tag");
      } else if (tag.includes(cleanQuery)) {
        score += 3;
        matchFields.push("tag");
      }
    }

    // word-by-word matches
    let wordMatches = 0;
    for (const word of queryWords) {
      if (word.length < 2) continue; // skip single letters

      if (title.includes(word)) {
        score += 2;
        wordMatches++;
      }
      if (desc.includes(word)) {
        score += 1;
        wordMatches++;
      }
      if (speaker.includes(word)) {
        score += 1.5;
        wordMatches++;
      }
      if (instructor.includes(word)) {
        score += 1.5;
        wordMatches++;
      }
      if (tags.some(t => t.includes(word))) {
        score += 1;
        wordMatches++;
      }
    }

    if (wordMatches > 0 && !matchFields.includes("keywords")) {
      matchFields.push("keywords");
    }

    if (score > 0) {
      results.push({
        item,
        score,
        matchFields: Array.from(new Set(matchFields))
      });
    }
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}
