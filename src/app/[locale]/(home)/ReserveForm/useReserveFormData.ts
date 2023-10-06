import { DailyDetailsMap } from '@/app/api/calendar/helpers/calendarService';
import { GET_CALENDAR_QUERY } from '@/constants/queryKeys';
import { useQuery } from 'react-query';

const useReserveFormData = () => {
  const { data, isLoading, isError, isFetching } = useQuery<DailyDetailsMap>(
    [GET_CALENDAR_QUERY],
    async () => {
      const response = await fetch('http://localhost:3000/api/calendar');
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  return {
    data,
    isLoading,
    isError,
    isFetching,
  };
};

export default useReserveFormData;
