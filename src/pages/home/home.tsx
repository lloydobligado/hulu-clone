import { Box } from "@mui/material";
import { LoaderComponent } from "../../components/common/loader";
import { useTmdbApi } from "../../services/tmdb"

const HomePage: React.FC = () => {
  const { useGetMovie } = useTmdbApi()

  const { data: details, isLoading } = useGetMovie();

  console.log(details);

  if (isLoading) {
    return (
      <Box className="h-[100vh]">
        <LoaderComponent />
      </Box>
    );
  }

  return (
    <>
    <Box className="flex flex-wrap">
      {details?.results.map(movie => {
        return (
          <img key={movie.id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        )
      })}
      </Box>
    </>
  )
}

export default HomePage