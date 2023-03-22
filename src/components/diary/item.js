import CustomButton from "../customButton";
import {useNavigate} from "react-router-dom";

const DiaryItem = (props) => {
    const navigate = useNavigate();
    const { id, emotion, content, date } = props;

    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const goDetail = () => {
        navigate(`/diary/${id}`)
    }

    const goEdit = () => {
        navigate(`/edit/${id}`)
    }
    return <div className="DiaryItem">
        <div onClick={goDetail}
             className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
            <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt=""/>
        </div>
        <div onClick={goDetail} className="info_wrapper">
            <div className="diary_date">
                {strDate}
            </div>
            <div className="diary_content_preview">
                {content.slice(0, 25)}
            </div>
        </div>
        <div className="btn_wrapper">
            <CustomButton btnNm={"수정하기"} type={"default"} onClick={goEdit}/>
        </div>
    </div>
}

export default DiaryItem;