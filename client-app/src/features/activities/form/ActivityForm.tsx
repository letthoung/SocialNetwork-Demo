import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivityFormValue } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/CategoryOptions';
import DateInput from '../../../app/common/form/DateInput';

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivityFormValue>({
    id: undefined,
    title: '',
    category: '',
    description: '',
    date: undefined,
    time: undefined,
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (match.params.id && activity.id) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      clearActivity()
    }
  }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id]);

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid()
  //     };
  //     createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
  //   } else {
  //     editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
  //   }
  // };

  const handleFinalFormSubmit = (value: any) => {
    console.log(value);
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
        <FinalForm 
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name='title'
                placeholder='Title'
                value={activity.title}
                component={TextInput}
              />
              <Field
                name='description'
                placeholder='Description'
                rows={3}
                value={activity.description}
                component={TextAreaInput}
              />
              <Field
                name='category'
                placeholder='Category'
                value={activity.category}
                options={category}
                component={SelectInput}
              />
              <Form.Group widths='equal'>
                <Field
                  name='date'
                  date={true}
                  placeholder='Date'
                  value={activity.date}
                  component={DateInput}
                />
                <Field
                  name='time'
                  time={true}
                  placeholder='Time'
                  value={activity.time}
                  component={DateInput}
                />
              </Form.Group>
              <Field
                name='city'
                placeholder='City'
                value={activity.city}
                component={TextInput}
              />
              <Field
                name='venue'
                placeholder='Venue'
                value={activity.venue}
                component={TextInput}
              />
              <Button
                loading={submitting}
                floated='right'
                positive
                type='submit'
                content='Submit'
              />
              <Button
                onClick={() => history.push('/activities')}
                floated='right'
                type='button'
                content='Cancel'
              />
            </Form>
          )}
        />
        
      </Segment>
      </Grid.Column>
      <Grid.Column width={6}>
      </Grid.Column>
      
    </Grid>
  );
};

export default observer(ActivityForm);
