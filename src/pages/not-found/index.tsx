import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
      }
    />
  );
}

export default NotFoundPage;
