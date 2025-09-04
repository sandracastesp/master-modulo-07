import { useForm } from "react-hook-form";

export default function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-sm mx-auto bg-white rounded shadow">
      <div className="mb-4">
        <label className="block mb-1">Nombre</label>
        <input 
          {...register("nombre", { required: "El nombre es obligatorio" })}
          className="border p-2 w-full"
        />
        {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </form>
  );
}
