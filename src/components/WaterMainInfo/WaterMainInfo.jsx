import css from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>aquatrack</h2>
        <picture>
          <source
            srcSet="
                    ./img/projects/project-1-desc.png    1x,
                    ./img/projects/project-1-desc@2x.png 2x
                  "
            media="(min-width: 768px)"
          />

          <source
            srcSet="
                    ./img/projects/project-1-mob.png    1x,
                    ./img/projects/project-1-mob@2x.png 2x
                  "
            media="(max-width: 767px)"
          />
          <img src="./img/projects/project-1-mob.png" alt="First project" />
        </picture>
      </div>
    </>
  );
};

export default WaterMainInfo;
