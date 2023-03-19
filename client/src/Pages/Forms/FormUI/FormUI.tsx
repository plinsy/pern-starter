import { useParams } from "react-router-dom";
import apiService from "../../../Providers/api.service";
import { useEffect, useState } from "react";
import Form from "../../../Models/Form";

const FormUI = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  let { date } = useParams();
  const [form, setForm] = useState<Form>();

  useEffect(() => {
    apiService
      .get(`/forms/${date}`)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <article className="card vh-100 border-0">
        <div className="card-body p-0">
          <section className="row h-100">
            <aside className="col-3 bg-success">
              <div className="card bg-transparent">
                <div className="card-header">
                  <h1>Enseignants à évaluer</h1>
                </div>
                <div className="card-body"></div>
              </div>
            </aside>
          </section>
        </div>
      </article>
    </>
  );
};

export default FormUI;
