import Notes from "./Notes";

const Home = (props) => {
  // const {showAlert} = props;
  return (
    <> 
      <Notes showAlert={props.showAlert}/>
    </>
  );
};

export default Home;
