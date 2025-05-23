import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Record = () => {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred:${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        response = await fetch(`http://localhost:5050/record/${params._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation", error);
    } finally {
      setForm({ name: "", position: "", level: "" });
      navigate("/");
    }
  }
  return (
    <>
      <h3 className="text-lg font-semibold p-4">
        {" "}
        Create/Update Employee Record
      </h3>
      <form
        action=""
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <h2 className="text-base font-semibold leading-7 text-slate-900">
            Employee Info
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            this information will be displayed publicly so be careful what you
            share
          </p>
        </div>
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
          <div className="sm:col-span-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-slate-900"
            >
              Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block felx-1 border-0 bg-transiparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="First Last"
                  value={form.name}
                  onChage={(e) => updateForm({ name: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Record;
