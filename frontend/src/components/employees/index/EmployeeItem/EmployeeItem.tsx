import React, { useState } from 'react';
import { Formik } from 'formik';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import { Heading, Paragraph } from '../../../shared/typography';
import { Box, Flex } from '../../../shared/layout';
import { selectUser } from '../../../../selectors/auth';
import { deleteEmployee, getSalary } from '../../../../api/client/companies';
import { Select, Label } from '../../../shared/forms';
import { OPTIONS_MONTH, OPTIONS_YEAR } from '../../../../constants';

import * as S from './EmployeeItem.styles';
import { THEME } from '../../../../theme';
import { X } from 'react-feather';

/* Props - <EmployeeItem />
============================================================================= */
type Props = {
  employee: any;
  onEmployeeDelete: () => void;
  mode?: 'basic' | 'wage';
};

/* <EmployeeItem />
============================================================================= */
const EmployeeItem: React.FunctionComponent<Props> = ({ employee, onEmployeeDelete, mode }) => {
  const user = useSelector(selectUser);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  /**
   * Handles delete button click event.
   */
  const handleDelete = async () => {
    let confirmation = confirm(
      `Určite chcete odstrániť zamestnanca "${employee.osobni.meno} ${employee.osobni.priezvisko}"?`,
    );

    if (confirmation) {
      setIsDeleteInProgress(true);

      await deleteEmployee(user.companyId, employee.id).then(() => {
        onEmployeeDelete();
      });
    }
  };

  /**
   * Handles compute button click event.
   */
  const handleSalaryCompute = async () => {
    setShowOverlay(true);

    await getSalary(user.companyId, employee.id);
  };

  if (mode === 'basic') {
    return (
      <S.Wrapper>
        <S.Main>
          <Box mb="s6">
            <Heading as="h3" mb="s2" textAlign="center">
              {employee.osobni.meno} {employee.osobni.priezvisko}
            </Heading>

            <Paragraph mb="0" textAlign="center">
              {employee.firemni.funkcia}
            </Paragraph>
          </Box>

          <Flex>
            <S.Tag isBold>#{employee.firemni.osobne_cislo}</S.Tag>
            <S.Tag>full-time</S.Tag>
          </Flex>
        </S.Main>

        <S.Footer>
          <Link href="/employees/[id]" as={`/employees/${employee.id}`}>
            <S.FooterButton>Upraviť</S.FooterButton>
          </Link>

          <S.FooterButton onClick={handleDelete} isRed>
            {isDeleteInProgress ? 'Odstraňovanie...' : 'Odstrániť'}
          </S.FooterButton>
        </S.Footer>
      </S.Wrapper>
    );
  } else {
    return (
      <Formik initialValues={{}} onSubmit={() => null}>
        <S.Wrapper>
          {showOverlay && (
            <S.Overlay>
              <S.OverlayCloseButton onClick={() => setShowOverlay(false)}>
                <X />
              </S.OverlayCloseButton>

              <S.Main>
                <Box mb="s10">
                  <Heading as="h3" mb="s2" textAlign="center">
                    {employee.osobni.meno} {employee.osobni.priezvisko}
                  </Heading>

                  <Paragraph mb="0" textAlign="center">
                    {employee.firemni.funkcia}
                  </Paragraph>
                </Box>

                {false ? (
                  <>
                    <Box mb="s4">
                      <Paragraph mb="s3" textAlign="center">
                        Obdobie:
                      </Paragraph>
                      <Heading as="h3" textAlign="center">
                        10/1998
                      </Heading>
                    </Box>

                    <Box mb="s4">
                      <Paragraph mb="s3" textAlign="center">
                        Hrubá mzda:
                      </Paragraph>
                      <Heading as="h3" textAlign="center">
                        68 133 €
                      </Heading>
                    </Box>

                    <Box>
                      <Paragraph mb="s3" textAlign="center">
                        Čistá mzda:
                      </Paragraph>
                      <Heading as="h3" mb="0" textAlign="center">
                        12 888 €
                      </Heading>
                    </Box>
                  </>
                ) : (
                  <>
                    <Loader type="Puff" color={THEME.colors.blues[1]} height={60} width={60} />
                    <Paragraph mt="s6" mb="0">
                      Prebieha výpočet mzdy...
                    </Paragraph>
                  </>
                )}
              </S.Main>
            </S.Overlay>
          )}

          <S.Main>
            <Box mb="s6">
              <Heading as="h3" mb="s2" textAlign="center">
                {employee.osobni.meno} {employee.osobni.priezvisko}
              </Heading>

              <Paragraph mb="0" textAlign="center">
                {employee.firemni.funkcia}
              </Paragraph>
            </Box>

            <Box width="100%" mx="s6">
              <Paragraph fontWeight="bold">Výpočet mzdy:</Paragraph>

              <Box mb="s6">
                <Label>Mesiac</Label>
                <Select name="month" options={OPTIONS_MONTH} />
              </Box>

              <Box>
                <Label>Rok</Label>
                <Select name="year" options={OPTIONS_YEAR} />
              </Box>
            </Box>
          </S.Main>

          <S.Footer>
            <S.FooterButton onClick={handleSalaryCompute}>Vypočítať</S.FooterButton>

            <Link href="/employees/[id]" as={`/employees/${employee.id}`}>
              <S.FooterButton>Upraviť</S.FooterButton>
            </Link>
          </S.Footer>
        </S.Wrapper>
      </Formik>
    );
  }
};

/* Default props - <EmployeeItem />
============================================================================= */
EmployeeItem.defaultProps = {
  mode: 'basic',
};

export default EmployeeItem;
