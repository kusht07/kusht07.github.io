export class FetchService {
  private static instance: FetchService;
  private apiUrl: string;

  private constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public static getInstance(apiUrl: string): FetchService {
    if (!FetchService.instance) {
      FetchService.instance = new FetchService(apiUrl);
    }
    return FetchService.instance;
  }

  /**
   * Fetches data from the API for a given category
   * @param {string} category - The category of data to fetch
   * @returns {Promise<any>} A promise that resolves to the fetched data
   * @throws {Error} If there's an error during the fetch operation
   */
  async fetchData(category): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Data:', error);
      throw error;
    }
  }
}
