/**
 * Validation utilities for request payloads
 */

export function validatePredictInput(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, message: 'Request body must be a valid JSON object' };
  }

  const { script } = body;
  if (!script || typeof script !== 'string' || script.trim().length === 0) {
    return { valid: false, message: 'Field "script" is required and cannot be empty' };
  }

  return { valid: true };
}

export function validateResearchInput(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, message: 'Request body must be a valid JSON object' };
  }

  const { topic } = body;
  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    return { valid: false, message: 'Field "topic" is required and cannot be empty' };
  }

  return { valid: true };
}

export function validateMetricsInput(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, message: 'Request body must be a valid JSON object' };
  }

  const { title } = body;
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return { valid: false, message: 'Field "title" is required and cannot be empty' };
  }

  return { valid: true };
}
