import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "../../store/actions";

type Activity = {
  name: string;
  start_date: string;
  distance: number;
  elapsed_time: number;
  total_elevation_gain: number;
};

function Activities({ token }) {
  const dispatch = useDispatch();
  const { activities } = useSelector((state) => state.activities);
  const dataUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${token}`;

  useEffect(() => {
    if (token) {
      fetch(dataUrl, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => dispatch(setActivities(data)));
    }
  }, [token, dataUrl]);

  const parseDate = (date: string) => {
    const indexOfT = date.indexOf("T");
    const parsedDate = date.substring(0, indexOfT);
    return parsedDate;
  };

  const [menu, setMenu] = useState(1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const extractMonth = (date) => {
    const newDate = new Date(parseDate(`${date}`));
    return newDate.getMonth();
  };

  const currentMonth = new Date().getMonth();

  const monthSplit = () => {
    const arr1 = activities
      .slice(0, 90)
      .filter((activity: Activity) => extractMonth(activity.start_date) === currentMonth);
    const arr2 = activities
      .slice(0, 90)
      .filter(
        (activity: Activity) => extractMonth(activity.start_date) === currentMonth - 1
      );
    const arr3 = activities
      .slice(0, 90)
      .filter(
        (activity: Activity) => extractMonth(activity.start_date) === currentMonth - 2
      );

    const monthSelection = [arr1, arr2, arr3];
    return monthSelection;
  };

  const sumDistance = (month: Activity[]) => {
    let sum = 0;
    for(let i = 0; i < month.length; i++){
      sum += month[i].distance;
    }
    return sum;
  }

  const sumTime = (month: Activity[]) => {
    let sum = 0;
    for(let i = 0; i < month.length; i++){
      sum += month[i].elapsed_time;
    }
    return sum;
  }

  const sumElevation = (month: Activity[]) => {
    let sum = 0;
    for(let i = 0; i < month.length; i++){
      sum += month[i].total_elevation_gain;
    }
    return sum;
  }

  const [singleMonth, setSingleMonth] = useState([])

  const selectMonth = (month) => {
    setSingleMonth(month)
    setMenu(3)
  }

  return (
    <>
      <div className={styles._nav}>
        <button onClick={() => setMenu(1)}>Recent Activity</button>
        <button onClick={() => setMenu(2)}>Latest Months</button>
      </div>
      <table className={menu === 1 ? styles._recent : styles._hidden}>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Distance (Mt)</th>
          <th>Time(Seg)</th>
          <th>Elevation gain(Mt)</th>
        </tr>
        {activities.slice(0, 14).map((activity: Activity, index: number) => (
          <tr key={index}>
            <td key={`${activity.name}1`}>{activity.name}</td>
            <td key={`${activity.name}2`}>
              {parseDate(`${activity.start_date}`)}
            </td>
            <td key={`${activity.name}3`}>{activity.distance}</td>
            <td key={`${activity.name}4`}>{activity.elapsed_time}</td>
            <td key={`${activity.name}5`}>{activity.total_elevation_gain}</td>
          </tr>
        ))}
      </table>

      <table className={menu === 2 ? styles._recent : styles._hidden}>
        <tr>
          <th>Month</th>
          <th>Distance(Mt)</th>
          <th>Time(Seg)</th>
          <th>Elevation gain(Mt)</th>
        </tr>
        {monthSplit().map((month, index: number) => (
          <tr key={index}>
            <td key={`${currentMonth - index}2`} onClick={()=>selectMonth(month)} className={styles._button}>{months[currentMonth - index]}</td>
            <td key={`${currentMonth - index}3`}>{sumDistance(month)}</td>
            <td key={`${currentMonth - index}4`}>{sumTime(month)}</td>
            <td key={`${currentMonth - index}5`}>{sumElevation(month)}</td>
          </tr>
        ))}
      </table>

      <table className={menu === 3 ? styles._recent : styles._hidden}>
      <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Distance(Mt)</th>
        <th>Time(Seg)</th>
        <th>Elevation gain(Mt)</th>
      </tr>
      {singleMonth.map((activity: Activity, index: number) => (
        <tr key={index}>
          <td key={`${activity.name}1`}>{activity.name}</td>
          <td key={`${activity.name}2`}>
            {parseDate(`${activity.start_date}`)}
          </td>
          <td key={`${activity.name}3`}>{activity.distance}</td>
          <td key={`${activity.name}4`}>{activity.elapsed_time}</td>
          <td key={`${activity.name}5`}>{activity.total_elevation_gain}</td>
        </tr>
      ))}
    </table>
    </>
  );
}

export default Activities;
