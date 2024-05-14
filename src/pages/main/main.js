import React,{ useState,useEffect} from "react";
import { GameContainer, ImgBox, ImgContainer, Game, Round } from "./styled";

import p0 from "../../img/chicken breast.jpg";
import p1 from "../../img/Mint Chocolate.jpg";
import p2 from "../../img/a1 (1).jpg";
import p3 from "../../img/a1 (1).png";
import p4 from "../../img/a1 (1).webp";
import p5 from "../../img/a1 (2).jpg";
import p6 from "../../img/a1 (2).webp";
import p7 from "../../img/a1 (3).jpg";
import p8 from "../../img/a1 (3).webp";
import p9 from "../../img/a1 (4).webp";
import p10 from "../../img/a1 (5).webp";
import p11 from "../../img/a1 (6).webp";
import p12 from "../../img/b1 (1).jpg";
import p13 from "../../img/b1 (1).webp";
import p14 from "../../img/b1 (2).jpg";
import p15 from "../../img/b1 (2).webp";
import userEvent from "@testing-library/user-event";





export const candidate = [
  {
    key: 0,
    name: "디저트 1",
    src: p0
  },
  {
    key: 1,
    name: "디저트 2",
    src: p1
  },
  {
    key: 2,
    name: "디저트 3",
    src: p2
  },
  {
    key: 3,
    name: "디저트 4",
    src: p3
  },
  {
    key: 4,
    name: "디저트 5",
    src: p4
  },
  {
    key: 5,
    name: "디저트 6",
    src: p5
  },
  {
    key: 6,
    name: "디저트 7",
    src: p6
  },
  {
    key: 7,
    name: "디저트 8",
    src: p7
  },
  {
    key: 8,
    name: "디저트 9",
    src: p8
  },
  {
    key: 9,
    name: "디저트 10",
    src: p9
  },
  {
    key: 10,
    name: "디저트 11",
    src: p10
  },
  {
    key: 11,
    name: "디저트 12",
    src: p11
  },
  {
    key: 12,
    name: "디저트 13",
    src: p12
  },
  {
    key: 13,
    name: "디저트 14",
    src: p13
  },
  {
    key: 14,
    name: "디저트 15",
    src: p14
  },
  {
    key: 15,
    name: "디저트 16",
    src: p15
  },
]




export const Main = () => {
    const [candy, setCandy] = useState(candidate);
    const [winCandy, setWinCandy] = useState([]);
    const [round, setRound] = useState(1);
    const [game, setGame] = useState(candidate?.length);

    useEffect(() => {
        setCandy(
            candidate
                .map((c) => {
                    return { key: c.key, name: c.name, src: c.src, order: Math.random() };
                })
                .sort((l, r) => {
                    return l.order - r.order;
                })
        );
    }, [])


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////




    const handleClick = (e) => {
///handleClick 함수를 정의. e는 발생한 클릭 이벤트

        setCandy((prev) => {
            ///setCandy 함수가 
            ///prev라는 이름으로

            const temp = prev.splice(0, 2)
            ///두 요소를 삭제하고 따로 저장함
            ///win 캔디 등에 보존하여 이후 상태를 정하는 건가?


            return prev.filter((el, i) => el.key !== temp.key)
            ////prev.filter를 사용해서 필터링으로 제외시킴. 
            ///템플키가 필요함
            
            
        })
        setRound((prev) => prev + 1);
                    ///setCandy 함수가 prev라는 명칭, 라운드 추가
                    /// 
        setWinCandy((prev) => [...prev, e])
        /// 클릭된 요소가 e가 됨. 
        ///이전 배열의 prev에 추가함. winCandy에 업데이트 됨
    }




    useEffect(() => {
        if (game === 1) {
            return;
            ///기본 라운드 1?
        }
        if (candy.length === 0) {
            setRound(1); ///라운드 설정 처음에는 1로 되어 있음
                        /// 위 코드에 setRound +1이 있기에 추가됨

            setCandy(winCandy); /// win캔디의 데이터를 보존한다. 다음 라운드에 사용할 수 있게 한다.
            setWinCandy([]); ///내용물을 비운다. 다만 위에 win캔디는 따로 보존을 하였기에 다음 경기에 사용 가능.
            setGame(prev => prev / 2); ///한 라운드가 끝나면 2분의 1로 줄어든다.
        }
    }, [round]);
    




    return (
        <>
            {
                ///game 수를 기본으로 함수 상태를 정의
                ///사진 한 장이 1게임, 2장이면 2game

                game === 1 ? <Game>Win!</Game> :
                                    ///1장이 남았을 때 뜨는 메세지. 즉 우승자를 나타냄
                game === 2 ? <Game>fanal</Game>: <Game>{game}{"고르세요"}</Game>
                    ///두장이 남았을 때 결승을 상징
                    ///
                    ///무한히 증식가능. 4장이 남았으면, game === 4 이 됨. 준결승 
            }



            {game > 2 &&
                <Round>{round}{"Round"}</Round>
            }
            <GameContainer>
                {candy.map((e, i) => {
                    if (i > 1) return;
                    return (
                        <ImgContainer onClick={() => handleClick(e)}>
                            

                            <ImgBox src={e.src} />
                            {/* 이미지 표시 */}

                            {e.name} 
                            {/* 이름 표시 */}
                        </ImgContainer>
                    )
                })}
            </GameContainer>
        </>
    )

}