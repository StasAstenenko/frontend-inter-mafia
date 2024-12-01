import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import css from "./UsersSettingsForm.module.css";
import { useEffect, useState } from "react";
import clsx from "clsx";

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
  const [calculateWaterNorm, setCalculateWaterNorm] = useState(null);

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

  useEffect(() => {
    if (weight && activeTime && gender) {
      let waterNorm = 0;
      if (gender === "woman") {
        waterNorm = Math.max(weight * 0.03 + activeTime * 0.4, 0);
      } else if (gender === "man") {
        waterNorm = Math.max(weight * 0.04 + activeTime * 0.6, 0);
      }
      setValue("waterDrink", waterNorm.toFixed(1));
      setCalculateWaterNorm(waterNorm.toFixed(1));
    }
  }, [weight, activeTime, gender, setValue]);

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
        {avatarPreview ? (
          <img
            className={css.settingAvatarImg}
            src={avatarPreview}
            alt="Avatar"
          />
        ) : (
          <div className={css.avatarPlaceholder}>N</div>
        )}
        <div>
          <button
            className={css.settingModalButton}
            type="button"
            onClick={() => document.getElementById("avatarInput").click()}
          >
            <svg width="18" height="18" className={css.settingAvatarIcon}>
              <use href="/icons/sprite.svg#upload"></use>
            </svg>

            <span className={css.avatarButtonText}>Upload a photo</span>
          </button>
          <input
            type="file"
            id="avatarInput"
            {...register("avatar")}
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className={css.settingAllForms}>
        <div className={css.settingGenderForm}>
          <div>
            <label className={css.settingLabel}>Your gender identity</label>
          </div>
          <div className={css.settingRadioButton}>
            <label className={css.settingRadioLabel}>
              <input
                type="radio"
                value="woman"
                {...register("gender")}
                className={css.settingRadioInput}
              />
              <span className={css.settingRadioCustom}></span>
              <span className={css.settingRadioText}>Woman</span>
            </label>
            <label className={css.settingRadioLabel}>
              <input
                type="radio"
                value="man"
                {...register("gender")}
                className={css.settingRadioInput}
              />
              <span className={css.settingRadioCustom}></span>
              <span className={css.settingRadioText}>Man</span>
            </label>
          </div>
          {errors.gender && (
            <p className={css.settingError}>{errors.gender.message}</p>
          )}
        </div>
        <div className={css.settingAllFormsDesctop}>
          <div>
            <div className={css.settingNameForm}>
              <div className={css.settingNameFormLabels}>
                <label className={css.settingLabel}>Your name</label>
                <input
                  type="text"
                  {...register("name")}
                  className={css.settingFormInput}
                />
                {errors.name && (
                  <p className={css.settingError}>{errors.name.message}</p>
                )}
              </div>

              <div className={css.settingNameFormLabels}>
                <label className={css.settingLabel}>Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className={css.settingFormInput}
                />
                {errors.email && (
                  <p className={css.settingError}>{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className={css.settingDailyForm}>
              <label className={css.settingLabel}>My daily norma</label>
              <div className={css.settingDailyAllCard}>
                <div className={css.settingDailyCard}>
                  <p className={css.settingDailyContext}>For woman:</p>
                  <p className={css.settingDailyFormula}>
                    V=(M*0.03) + (T*0.4)
                  </p>
                </div>
                <div className={css.settingDailyCard}>
                  <p className={css.settingDailyContext}>For man:</p>
                  <p className={css.settingDailyFormula}>
                    V=(M*0.04) + (T*0.6)
                  </p>
                </div>
              </div>
              <div className={css.settingDailyDescription}>
                <p className={css.settingDailyDescrText}>
                  <span className={css.settingDailyDescriptionSpan}>*</span> V
                  is the volume of the water norm in liters per day, M is your
                  body weight, T is the time of active sports, or another type
                  of activity commensurate in terms of loads (in the absence of
                  these, you must set 0)
                </p>
              </div>
              <div>
                <p className={css.settingDailyRemark}>
                  <span className={css.settingDailyRemarkSpan}>!</span> Active
                  time in honours
                </p>
              </div>
            </div>
          </div>
          <div className={css.settingAllFormsSecond}>
            <div className={css.settingWeightTimeForm}>
              <div className={css.settingWeightLabel}>
                <label className={css.settingWeightContext}>
                  Your weight in kilograms:
                </label>
                <input
                  type="number"
                  {...register("weight")}
                  className={css.settingFormInput}
                />
              </div>
              <div className={css.settingWeightLabel}>
                <label className={css.settingWeightContext}>
                  The time of active participation in sports:
                </label>
                <input
                  type="number"
                  {...register("activeTime")}
                  className={css.settingFormInput}
                />
              </div>
            </div>
            <div className={css.settingCalculateForm}>
              <div className={css.settingCalculate}>
                <p className={css.settingCalculateText}>
                  The required amount of water in liters per day:
                </p>
                <p className={css.settingCalculateTextSpan}>
                  2 {calculateWaterNorm}
                </p>
              </div>
              <div>
                <label className={clsx(css.settingLabel, css.settingLabelText)}>
                  Write down how much water you will drink:
                </label>

                <input
                  type="number"
                  {...register("waterNorm")}
                  className={css.settingFormInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className={css.settingFormButton}>
        Save
      </button>
    </form>
  );
};

export default UsersSettingsForm;
