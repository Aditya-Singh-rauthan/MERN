import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import { deleteEducation } from "../../actions/profile";
const Education = (props) => {
  const educations = props.education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="un">{edu.degree}</td>
      <td>{edu.fieldofstudy}</td>
      <td className="un">
        <Moment format="YYYY/MM/DD">{edu.from}</Moment>-
        {edu.to === null ? (
          "NOW"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => props.deleteEducation(edu._id, props.history)}
          className="btn-delete"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <br />
      <br />
      <h3>Degrees and Bootcamps:-</h3>
      <table className="edutable tile">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Field Of Study</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  deleteEducation,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Education));
