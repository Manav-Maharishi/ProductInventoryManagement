import { useEffect, useMemo, useState } from "react";

function Activity() {

  const [logs, setLogs] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    fetch(
      "http://localhost:5037/api/auth/activity",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )
      .then(
        response =>
          response.json()
      )

      .then(
        data =>
          setLogs(
            [...data].reverse()
          )
      )

      .catch(
        console.log
      );

  }, []);

  const filteredLogs =
    useMemo(
      () =>
        logs.filter(
          (log) => {

            const text =
              `
${log.User}
${log.Action}
${log.Timestamp}
`
                .toLowerCase();

            return text.includes(
              searchTerm
                .toLowerCase()
            );
          }
        ),

      [logs, searchTerm]
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .ac-root{
          min-height:100vh;
          background:#0a0b0f;
          padding:100px 40px;
          font-family:'DM Sans';
          color:white;
        }

        .ac-header{
          margin-bottom:40px;
        }

        .ac-title{
          font-size:42px;
          font-weight:700;
          margin-bottom:18px;
        }

        .ac-search{
          width:100%;
          max-width:420px;

          padding:14px 18px;

          background:
          rgba(255,255,255,0.04);

          border:
          1px solid rgba(255,255,255,0.08);

          border-radius:16px;

          color:white;

          font-size:14px;

          outline:none;

          transition:.25s;
        }

        .ac-search:focus{
          border-color:
          rgba(255,255,255,0.18);

          background:
          rgba(255,255,255,0.06);
        }

        .ac-search::placeholder{
          color:
          rgba(255,255,255,0.35);
        }

        .ac-list{
          display:flex;
          flex-direction:column;
          gap:16px;
        }

        .ac-card{

          padding:22px;

          border-radius:18px;

          background:
          rgba(255,255,255,0.04);

          border:
          1px solid rgba(255,255,255,0.08);

          transition:
          transform .3s ease,
          border .3s ease;
        }

        .ac-card:hover{

          transform:
          translateY(-2px);

          border-color:
          rgba(255,255,255,0.14);
        }

        .ac-user{

          font-size:17px;

          font-weight:700;

          margin-bottom:8px;
        }

        .ac-action{

          color:
          rgba(255,255,255,0.78);

          line-height:1.6;

          margin-bottom:12px;
        }

        .ac-time{

          font-size:13px;

          color:
          rgba(255,255,255,0.34);
        }

        .ac-empty{

          padding:80px;

          text-align:center;

          border-radius:20px;

          background:
          rgba(255,255,255,0.03);

          border:
          1px solid rgba(255,255,255,0.06);

          color:
          rgba(255,255,255,0.4);
        }
      `}</style>

      <div className="ac-root">

        <div className="ac-header">

          <div className="ac-title">
            Activity
          </div>

          <input
            className="ac-search"

            placeholder="Search logs"

            value={searchTerm}

            onChange={
              (e)=>
              setSearchTerm(
                e.target.value
              )
            }
          />

        </div>

        <div className="ac-list">

          {
            filteredLogs.length === 0

            ?

            <div className="ac-empty">

              No matching logs

            </div>

            :

            filteredLogs.map(
              (
                log,
                index
              ) => (

                <div
                  key={index}

                  className="ac-card"
                >

                  <div className="ac-user">
                    {log.User}
                  </div>

                  <div className="ac-action">
                    {log.Action}
                  </div>

                  <div className="ac-time">

                    {
                      new Date(
                        log.Timestamp
                      )

                      .toLocaleString()
                    }

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>
    </>
  );
}

export default Activity;