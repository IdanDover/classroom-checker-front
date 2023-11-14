import LinkButton from "../components/LinkButton";

function page404() {
  return (
    <div>
      <h2>נראה שהגעת למקום הלא נכון</h2>
      <LinkButton to={"/home"} target={undefined}>
        חזרה לחוף מבטחים
      </LinkButton>
    </div>
  );
}

export default page404;
