import { Box } from "@mui/material";
import { LoaderComponent } from "../../components/common/loader";
import { useTmdbApi } from "../../services/tmdb"

const HomePage: React.FC = () => {
  const { useGetMovie } = useTmdbApi()

  const { data: details, isLoading } = useGetMovie();

  console.log(details?.results);

  if (isLoading) {
    return (
      <Box className="h-[calc(100vh_-_112px)]">
        <LoaderComponent />
      </Box>
    );
  }

  return (
    <div>HOME PAGE</div>
  )
}

export default HomePage