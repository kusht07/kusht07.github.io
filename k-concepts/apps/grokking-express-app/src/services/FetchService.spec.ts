import { FetchService } from './FetchService';

// Mock the global fetch function
global.fetch = jest.fn();

describe('FetchService', () => {
  let fetchService: FetchService;
  const apiUrl = 'https://api.example.com';

  beforeEach(() => {
    fetchService = FetchService.getInstance(apiUrl);
    jest.clearAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = FetchService.getInstance(apiUrl);
    const instance2 = FetchService.getInstance(apiUrl);
    expect(instance1).toBe(instance2);
  });

  describe('fetchData', () => {
    it('should fetch data successfully', async () => {
      const mockData = { id: 1, name: 'Test' };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchService.fetchData('testCategory');

      expect(global.fetch).toHaveBeenCalledWith(`${apiUrl}/testCategory`);
      expect(result).toEqual(mockData);
    });

    it('should throw an error when fetch fails', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(fetchService.fetchData('testCategory')).rejects.toThrow('HTTP error! status: 404');
    });

    it('should throw an error when network error occurs', async () => {
      const networkError = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValue(networkError);

      await expect(fetchService.fetchData('testCategory')).rejects.toThrow('Network error');
    });
  });
});