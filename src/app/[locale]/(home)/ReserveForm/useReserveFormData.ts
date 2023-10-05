import { GET_CALENDAR_QUERY } from '@/constants/queryKeys';
import { useQuery } from 'react-query';

interface GetCalendarResponse {}

const useReserveFormData = () => {
  const { data, isLoading, isError, isFetching } =
    useQuery<GetCalendarResponse>([GET_CALENDAR_QUERY], async () => {
      const response = await fetch('http://localhost:3000/api/calendar');
      return response.json();
    });

  return {
    data,
    isLoading,
    isError,
    isFetching,
  };
};

export default useReserveFormData;
