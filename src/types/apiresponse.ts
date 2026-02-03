export interface ApiErrorResponse {
  statusCode?: number;
  error?: string;
  message?: string;
  timestamp?: string;
  path?: string;
  details?: string[];
}