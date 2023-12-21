import { useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import cssStyle from "../css/Detail.module.css";
// import Count from '../components/Count';
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartList";

export default function Detail() {
  let { id } = useParams();
  let productData = useSelector((a) => a.pData);
  let item = productData.find((a) => String(a._id) === id);
  let similar = productData.filter((a) => a.category === item.category);

  let [open, setOpen] = useState(true);
  let [count, setCount] = useState(1);
  let [modal, setModal] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    let timmer = setTimeout(() => {
      setOpen(false);
    }, 2000);
    return () => {
      setOpen(true);
      clearTimeout(timmer);
    };
  }, [id]);

  let watched = JSON.parse(localStorage.getItem("watched") || "[]");
  let update = [...new Set([...watched, item._id])];
  localStorage.setItem("watched", JSON.stringify(update));

  return (
    <main>
      {modal && <Modal setModal={setModal} />}

      {open && (
        <div
          style={{
            backgroundColor: "green",
            color: "white",
            textAlign: "center",
            padding: "2rem 0",
          }}>
          2초 안에 클릭하시오
        </div>
      )}

      <div className={cssStyle.detailCon}>
        <div className={cssStyle.img}>
          <img
            src={`${process.env.PUBLIC_URL}/img/${item.img}`}
            alt={item.title}
          />
        </div>
        <div className={cssStyle.desc}>
          <strong>{item.title}</strong>
          <span>{Number(item.price).toLocaleString()}원</span>
          <div className={cssStyle.count}>
            {count <= 1 ? (
              <button disabled>-</button>
            ) : (
              <button
                onClick={() => {
                  setCount((prev) => prev - 1);
                }}>
                -
              </button>
            )}

            <span>{count}</span>
            <button
              onClick={() => {
                setCount((prev) => prev + 1);
              }}>
              +
            </button>
            <button
              onClick={() => {
                dispatch(
                  addItem({
                    _id: item._id,
                    title: item.title,
                    img: item.img,
                    price: item.price,
                    count: count,
                  })
                );
                setModal(true);
              }}>
              ADD CART
            </button>
          </div>
        </div>
      </div>
      <div style={{ padding: "50px 0" }}>
        <Tabs
          defaultActiveKey='Description'
          id='fill-tab-example'
          className='mb-3'
          fill>
          <Tab eventKey='Description' title='Description'>
            <div>1 상품 상세정보 컨포넌트 들어가는 곳</div>
          </Tab>
          <Tab eventKey='information' title='Aditional information'>
            <div>2 상품 기타정보 컨포넌트 들어가는 곳</div>
          </Tab>
          <Tab eventKey='Reviews' title='Reviews'>
            <div>리뷰 컨포넌트 들어가는 곳</div>
          </Tab>
        </Tabs>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={20}
        className={cssStyle.slide}>
        {similar.map((data) => (
          <SwiperSlide key={data._id}>
            <ProductCard data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
