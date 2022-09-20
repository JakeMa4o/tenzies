export default function Die(props) {
  return (
    <div
      className="die"
      style={{ backgroundColor: props.isHeld && "#59E391" }}
      onClick={props.holdDice}
    >
      <h2>{props.value}</h2>
    </div>
  )
}