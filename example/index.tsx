import 'react-app-polyfill/ie11';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Box,
  Button,
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  Flex,
  Heading,
  HStack,
  Link,
  StackDivider,
  Switch,
  ThemeConfig,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import {
  SingleDatepicker,
  RangeDatepicker,
  DatepickerConfigs,
  Weekday_Names_Short,
} from '../src';
import GitHubButton from 'react-github-btn';
import { subDays, addDays, startOfDay } from 'date-fns';

type FirstDayOfWeek = DatepickerConfigs['firstDayOfWeek'];
const offsets: FirstDayOfWeek[] = [0, 1, 2, 3, 4, 5, 6];

const Section: React.FC<React.PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => (
  <VStack spacing={3} alignItems="flex-start" padding={'0.25rem'}>
    <Heading size="lg">{title}</Heading>
    {children}
  </VStack>
);

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const demoDate = new Date();
  const [date, setDate] = useState(demoDate);
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<FirstDayOfWeek>(1);
  const [isSingleChecked, setSingleCheck] = useState(true);
  const [isRangeChecked, setRangeCheck] = useState(true);

  return (
    <VStack
      paddingX={{ base: '2rem', md: '8rem' }}
      paddingY={{ base: '1rem', md: '4rem' }}
      spacing={4}
      minHeight={'600px'}
      alignItems="flex-start"
      divider={<StackDivider />}
    >
      <Heading>Chakra-Dayzed-Datepicker</Heading>
      <Flex gridGap={5} height="28px">
        <GitHubButton
          href="https://github.com/aboveyunhai/chakra-dayzed-datepicker"
          data-size="large"
          data-show-count="true"
          aria-label="Star aboveyunhai/chakra-dayzed-datepicker on GitHub"
        >
          Star
        </GitHubButton>
        <Link href="https://github.com/aboveyunhai/chakra-dayzed-datepicker/blob/main/example/index.tsx">
          Source code of all examples
        </Link>
      </Flex>
      <Section title="Single:">
        <Flex alignItems={'center'}>
          <Box marginRight={'1rem'}>closeOnSelect:</Box>
          <Switch
            isChecked={isSingleChecked}
            onChange={(e) => setSingleCheck(e.currentTarget.checked)}
          />
        </Flex>
        <SingleDatepicker
          name="date-input"
          date={date}
          disabledDates={
            new Set([
              startOfDay(subDays(demoDate, 6)).getTime(),
              startOfDay(subDays(demoDate, 4)).getTime(),
              startOfDay(subDays(demoDate, 2)).getTime(),
            ])
          }
          minDate={subDays(demoDate, 8)}
          maxDate={addDays(demoDate, 8)}
          onDateChange={setDate}
          closeOnSelect={isSingleChecked}
        />
      </Section>
      <Section title="Range:">
        <Flex alignItems={'center'}>
          <Box marginRight={'1rem'}>closeOnSelect:</Box>
          <Switch
            isChecked={isRangeChecked}
            onChange={(e) => setRangeCheck(e.currentTarget.checked)}
          />
        </Flex>
        <RangeDatepicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
          closeOnSelect={isRangeChecked}
        />
      </Section>
      <Section title="Custom Styles:">
        Custom Styles:
        <p>
          If you used light/dark theme, just be aware of your style under
          specific mode.
        </p>
        <Button size="sm" onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        <SingleDatepicker
          name="date-input"
          date={date}
          onDateChange={setDate}
          propsConfigs={{
            dayOfMonthBtnProps: {
              defaultBtnProps: {
                _hover: {
                  background: 'blue.300',
                },
              },
              selectedBtnProps: {
                background: '#0085f230',
              },
            },
            dateNavBtnProps: {
              _hover: {
                background: '#0085f230',
              },
            },
            popoverCompProps: {
              popoverContentProps: {
                background: 'gray.700',
                color: 'white',
              },
            },
          }}
        />
        <RangeDatepicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
          propsConfigs={{
            dateNavBtnProps: {
              colorScheme: 'blue',
              variant: 'outline',
            },
            dayOfMonthBtnProps: {
              defaultBtnProps: {
                borderColor: 'red.300',
                _hover: {
                  background: 'blue.400',
                },
              },
              isInRangeBtnProps: {
                color: 'purple.800',
                borderColor: 'blue.300',
              },
              selectedBtnProps: {
                background: 'blue.200',
                borderColor: 'blue.300',
                color: 'blue.600',
              },
              todayBtnProps: {
                background: 'teal.200',
                color: 'teal.700',
              },
            },
            inputProps: {
              size: 'sm',
            },
          }}
        />
      </Section>
      <Section title="Custom Month/Weekday/Format:">
        <RangeDatepicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
          configs={{
            dateFormat: 'yyyy-MM-dd',
            dayNames: 'abcdefg'.split(''), // length of 7
            monthNames: 'ABCDEFGHIJKL'.split(''), // length of 12
          }}
        />
      </Section>
      <Section title="With Offset:">
        <Box>First Day of Week: {Weekday_Names_Short[firstDayOfWeek || 0]}</Box>
        <HStack spacing={1}>
          {offsets.map((e) => (
            <Button
              key={e}
              onClick={() => setFirstDayOfWeek(e)}
              backgroundColor={firstDayOfWeek === e ? 'green.300' : undefined}
            >
              {e}
            </Button>
          ))}
        </HStack>
        <SingleDatepicker
          name="date-input"
          date={date}
          onDateChange={setDate}
          configs={{
            firstDayOfWeek,
          }}
        />
        <RangeDatepicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
          configs={{
            firstDayOfWeek,
          }}
        />
      </Section>
    </VStack>
  );
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.render(
  <>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </>,
  document.getElementById('root')
);
