import React from 'react';
import { connect } from 'react-redux';
import editBlurb from '../suitability_actions/blurb';
import Form from 'react-bootstrap/Form';

const Notes = (props) => {
    const handleChangeNotes = (e) => {
        const notes = e.target.value;
        props.dispatch(editBlurb({ notes }))
    }
    return (
        <div className="blurb notes shadow">
            <Form>
                <table className="blurb-content">
                    <thead>
                        <tr>
                            <th>Additional Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="blurb-input">
                                <Form.Control 
                                    className="input" 
                                    as="textarea" 
                                    rows="3" 
                                    onChange={handleChangeNotes}
                                    value={props.blurb.notes}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </div>
        
    )
}

const mapStateToProps = (state) => ({
    blurb: state.blurb
})

export default connect(mapStateToProps)(Notes);