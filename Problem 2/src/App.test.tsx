import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("CurrencyExchange Component", () => {
  test("should display the conversion correctly", () => {
    render(<App />);
    expect(
      screen.getByText("Tue, 29 Aug 2023 07:10:30 GMT")
    ).toBeInTheDocument();
    expect(screen.getByText("1 USD equals")).toBeInTheDocument();
    expect(screen.getByText("1.00 USD")).toBeInTheDocument();
  });

  test("should update the conversion when the from amount changes", async () => {
    render(<App />);

    const fromAmountInput = screen.getByLabelText("Amount");
    fireEvent.change(fromAmountInput, { target: { value: "10" } });

    await waitFor(() => {
      expect(screen.getByText("10 USD equals")).toBeInTheDocument();
      expect(screen.getByText("10.00 USD")).toBeInTheDocument();
    });
  });

  test("should update the conversion when the to amount changes", async () => {
    render(<App />);

    const convertedInput = screen.getByLabelText("Converted");
    fireEvent.change(convertedInput, { target: { value: "8.5" } });

    await waitFor(() => {
      expect(screen.getByText("8.5 USD equals")).toBeInTheDocument();
      expect(screen.getByText("8.50 USD")).toBeInTheDocument();
    });
  });

  test("should update the conversion when the from currency changes", async () => {
    render(<App />);

    const fromCurrencySelector = screen.getByLabelText("From");
    await userEvent.click(fromCurrencySelector);
    const menuitem1 = await screen.findByText("USDC");
    expect(menuitem1).toBeInTheDocument();
    await userEvent.click(menuitem1);
    await waitFor(() => {
      expect(screen.getByText("1 USDC equals")).toBeInTheDocument();
      expect(screen.getByText("1.01 USD")).toBeInTheDocument();
    });
  });

  test("should update the conversion when the to currency changes", async () => {
    render(<App />);

    const fromCurrencySelector = screen.getByLabelText("To");
    await userEvent.click(fromCurrencySelector);
    const menuitem1 = await screen.findByText("ETH");
    expect(menuitem1).toBeInTheDocument();
    await userEvent.click(menuitem1);
    await waitFor(() => {
      expect(screen.getByText("1 USD equals")).toBeInTheDocument();
      expect(screen.getByText("1645.93 ETH")).toBeInTheDocument();
    });
  });
});
