import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import { deleteExperience } from "../../actions/profile";
const Experience = (props) => {
  const experiences =
    props.experience.length === 0 ? (
      <h2>You Have Not Uploaded Any Experience</h2>
    ) : (
      props.experience.map((exp) => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td className="un">
            <Moment format="YYYY/MM/DD">{exp.from}</Moment>-
            {exp.to === null ? (
              "NOW"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={() => props.deleteExperience(exp._id, props.history)}
              className="btn-delete"
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    );
  return (
    <Fragment>
      <hr />
      <br />
      <br />
      <h3>EXPERIENCES:-</h3>
      <table className="exptable tile">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  deleteExperience,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Experience));
