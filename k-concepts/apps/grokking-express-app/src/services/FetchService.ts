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
