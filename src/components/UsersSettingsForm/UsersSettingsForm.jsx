import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import css from "./UsersSettingsForm.module.css";

const validationSettingSchema = Yup.object().shape({
  avatarUrl: Yup.mixed(),
  gender: Yup.string().oneOf(["woman", "man"]).required("Gender is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  weight: Yup.number()
    .positive("Weight must be a positive number")
    .nullable()
    .required("Weight is required"),
  activeTime: Yup.number()
    .min(0, "Active time cannot be negative")
    .required("Active time is required")
    .nullable(),
  dailyNorm: Yup.number()
    .positive("Water norm must be a positive number")
    .nullable()
    .required("Water norm is required"),
});

const UsersSettingsForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSettingSchema),
  });

  const weight = watch("weight");
  const activeTime = watch("activeTime");
  const gender = watch("gender");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue("avatarUrl", e.target.files);
    }
  };

  return (
    <form
      className={css.settingForm}
      onSubmit={handleSubmit((d) => console.log(d))}
    >
      <div className={css.settingFormAvatar}>
        <img className={css.settingAvatarImg} src={avatarPreview} />
        <button
          className={css.settingModalButton}
          type="button"
          onClick={() => document.getElementById("avatarInput").click()}
        >
          <svg width="18" height="18" className={css.settingAvatarIcon}>
            <use href="/icons/sprite.svg#upload"></use>
          </svg>
        </button>
        <input
          type="file"
          id="avatarInput"
          {...register("avatar")}
          onChange={handleAvatarChange}
          style={{ display: "none" }}
        />
      </div>
    </form>
  );
};

export default UsersSettingsForm;
