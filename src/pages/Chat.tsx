import { useParams } from "react-router";

export default function Chat() {
  const {userId}= useParams()
  return <>user {userId}</>;
}
