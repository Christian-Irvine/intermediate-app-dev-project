/**
 * Created by Christian James Irvine
 * Renders when there is no page found at a given URL
 */
import "../App.css";

const PageNotFound: React.FC = () => {
  return (
    <>
      <h1>Error 404: Page Not Found</h1>
      <p>Get pranked you typed the url wrong</p>
    </>
  );
};

export default PageNotFound;
