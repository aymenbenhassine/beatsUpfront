import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import DailyIframe from '@daily-co/daily-js';

export default function Video({ match }) {
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    const domain = 'https://beatsup.daily.co/';
    const url = 'http://localhost:3000';
    axios
      .get(`${url}/video-call/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const callFrame = DailyIframe.createFrame({
            iframeStyle: {
              position: 'fixed',
              top: "10%",
              right: "5%",
              width: '80%',
              height: '85%',
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: domain + id,
          });
          document.body.appendChild(callFrame);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return <></>;
}
