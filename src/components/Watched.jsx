import { useSelector } from "react-redux";
import ccsStyle from "../css/Watched.module.css";
import { useNavigate } from "react-router-dom";

export default function Watched() {
  let navigate = useNavigate();
  let wList = useSelector((a) => a.watched);
  let data = useSelector((a) => a.pData);
  let watchedData = data.filter((itme) => wList.includes(itme._id));
  return (
    <div className={ccsStyle.watched}>
      <h2>최근본 상품</h2>
      <ul>
        {watchedData.map((list) => (
          <li
            key={list._id}
            onClick={() => {
              navigate(`/detail/${list._id}`);
            }}>
            <img
              src={`${process.env.PUBLIC_URL}/img/${list.img}`}
              alt={list.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
