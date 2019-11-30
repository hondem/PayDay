import React, { useState } from 'react';
import { Formik, Form } from 'formik';

import { Grid, Box, Flex } from '../../../shared/layout';
import { Label, Input, Select, ErrorMessage } from '../../../shared/forms';
import { Link, Button } from '../../../shared/misc';
import { SelectOption } from '../../../../types/common'

/* Form data
============================================================================= */
type FormValues = {
  meno: string;
  priezvisko: string;
};

const INITIAL_VALUES: FormValues = {
  meno: '',
  priezvisko: '',
};

const SEX_OPTION: SelectOption[] = [
  {
    label: "Žena",
    value: "F"
  },
  {
    label: "Muž",
    value: "M"
  }
]


const RELATION_OPTION: SelectOption[] = [
  {
    label: "Vydatá/Ženatý",
    value: "Z"
  },
  {
    label: "Slobodn(á)/ý",
    value: "S"
  }
]

/* Props - <PersonalInfoForm />
============================================================================= */
type Props = {};

/* <PersonalInfoForm />
============================================================================= */
const PersonalInfoForm: React.FunctionComponent<Props> = () => {
  const [initialValues, setInitialValues] = useState<FormValues>(INITIAL_VALUES);
  const [sexOptions, setSexOptions] = useState<SelectOption[]>(SEX_OPTION);
  const [relationOptions, setRelationOptions] = useState<SelectOption[]>(RELATION_OPTION);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={() => null}>
        {({ isSubmitting }) => (
          <>
            <Form>
              <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
                <div>
                  <Label htmlFor="meno">Meno</Label>
                  <Input name="meno" />
                  <ErrorMessage name="meno" />
                </div>

                <div>
                  <Label htmlFor="priezvisko">Priezvisko</Label>
                  <Input name="priezvisko" />
                  <ErrorMessage name="priezvisko" />
                </div>

                <div>
                  <Label htmlFor="stredne_meno">Stredné meno</Label>
                  <Input name="stredne_meno" />
                  <ErrorMessage name="stredne_meno" />
                </div>

                <div>
                  <Label htmlFor="pohlavie">Pohlavie</Label>
                  <Select name="pohlavie" options={sexOptions}/>
                  <ErrorMessage name="pohlavie" />
                </div>

                <div>
                  <Label htmlFor="datum_nar">Dátum narodenia</Label>
                  <Input name="datum_nar" />
                  <ErrorMessage name="datum_nar" />
                </div>
                
                <div>
                  <Label htmlFor="rodne_cislo">Rodné číslo</Label>
                  <Input name="rodne_cislo" />
                  <ErrorMessage name="rodne_cislo" />
                </div>

                <div>
                  <Label htmlFor="miesto_narodenia">Miesto narodenia</Label>
                  <Input name="miesto_narodenia" />
                  <ErrorMessage name="miesto_narodenia" />
                </div>

                <div>
                  <Label htmlFor="statna_prislusnost">Štátna príslušnosť</Label>
                  <Input name="statna_prislusnost" />
                  <ErrorMessage name="statna_prislusnost" />
                </div>

                <div>
                  <Label htmlFor="pas">Pas</Label>
                  <Input name="pas" />
                  <ErrorMessage name="pas" />
                </div>

                <div>
                  <Label htmlFor="stav">Stav</Label>
                  <Select name="stav" options={relationOptions} />
                  <ErrorMessage name="stav" />
                </div>

                <div>
                  <Label htmlFor="obciansky">Občiansky preukaz</Label>
                  <Input name="obciansky" />
                  <ErrorMessage name="obciansky" />
                </div>
              </Grid>

              <Button type="submit" color="blue" disabled={isSubmitting}>
                {isSubmitting ? 'Ukladám...' : 'Uložiť'}
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

/* Default props - <PersonalInfoForm />
============================================================================= */
PersonalInfoForm.defaultProps = {};

export default PersonalInfoForm;
