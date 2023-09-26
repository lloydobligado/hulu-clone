import { QueryKey, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Movies } from './types';

export const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=3e2697175762d76e5d6fe62cd13e7319';

export const useTmdbApi = () => {
    const getMovie = async (): Promise<Movies | unknown> => {
        try {
            const response = await axios.get(`${BASE_URL}`);
            return response.data;
          } catch (err) {
            if (axios.isAxiosError(err) && err.response && err.response.status === 429) {
              // Handle rate limit exceeded error
              const retryAfter = parseInt(err.response.headers['retry-after']) || 5; // Default delay of 5 seconds
              console.log(`Rate limited. Retrying after ${retryAfter} seconds...`);
              await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
              return getMovie();
            }
            return err;
        }
    }

      //get anime
    const useGetMovie = () => {
        return useQuery<Movies>({
        queryKey: [`movie`],
        queryFn: async () => getMovie(),
        keepPreviousData: true,
        } as { queryKey: QueryKey });
    };

    return {
        useGetMovie,
      };
};