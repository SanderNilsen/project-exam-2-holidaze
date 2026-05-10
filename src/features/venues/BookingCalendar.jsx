import styled from "styled-components";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const CalendarWrapper = styled.div`
  display: grid;
  gap: 12px;

  .rdp {
    margin: 0;
  }

  .rdp-months {
    justify-content: center;
  }

  .rdp-day_button {
    border-radius: 8px;
  }

  .rdp-selected .rdp-day_button {
    background: var(--primary);
    color: #ffffff;
  }

  .rdp-range_middle .rdp-day_button {
    background: rgba(29, 78, 216, 0.12);
    color: var(--text);
  }

  .rdp-disabled {
    opacity: 0.45;
  }

  .booked-day .rdp-day_button {
    background: #fee2e2;
    color: #991b1b;
    text-decoration: line-through;
  }
`;

const Legend = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--text-muted);
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $variant }) =>
    $variant === "booked" ? "#ef4444" : "var(--primary)"};
`;

/**
 * Formats a Date object as YYYY-MM-DD for controlled calendar state.
 *
 * @param {Date} date - Selected calendar date.
 * @returns {string} Local date string used by booking form state.
 */
function formatDateForState(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Creates a local Date from a YYYY-MM-DD string without UTC timezone shifting.
 *
 * @param {string} dateString - Date string from booking form state.
 * @returns {Date|undefined} Local Date instance or undefined when empty.
 */
function createLocalDate(dateString) {
  if (!dateString) return undefined;

  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Converts API booking dates into DayPicker date ranges.
 *
 * @param {Array<Object>} bookings - Existing venue bookings from the API.
 * @returns {Array<{from: Date, to: Date}>} Ranges used for disabled/booked days.
 */
function getBookedRanges(bookings) {
  return bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));
}

/**
 * Renders a range calendar that blocks past dates and existing bookings.
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} [props.bookings=[]] - Existing venue bookings.
 * @param {string} props.dateFrom - Selected check-in date.
 * @param {string} props.dateTo - Selected check-out date.
 * @param {Function} props.onChange - Receives updated dateFrom/dateTo values.
 * @returns {JSX.Element} Booking calendar UI.
 */
export default function BookingCalendar({
  bookings = [],
  dateFrom,
  dateTo,
  onChange,
}) {
  const bookedRanges = getBookedRanges(bookings);

  const selectedRange = {
    from: createLocalDate(dateFrom),
    to: createLocalDate(dateTo),
  };

  function handleSelect(range) {
    onChange({
      dateFrom: range?.from ? formatDateForState(range.from) : "",
      dateTo: range?.to ? formatDateForState(range.to) : "",
    });
  }

  return (
    <CalendarWrapper>
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        disabled={[{ before: new Date() }, ...bookedRanges]}
        modifiers={{
          booked: bookedRanges,
        }}
        modifiersClassNames={{
          booked: "booked-day",
        }}
        excludeDisabled
        min={1}
      />

      <Legend>
        <LegendItem>
          <Dot />
          Selected
        </LegendItem>

        <LegendItem>
          <Dot $variant="booked" />
          Unavailable
        </LegendItem>
      </Legend>
    </CalendarWrapper>
  );
}