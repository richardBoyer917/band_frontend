import { CircularProgress } from "@mui/material";

const LoadingProgress = () => {
  return(
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
      <CircularProgress style={{width: "200px", height: "200px"}} />
    </div>
  )
}

export default LoadingProgress