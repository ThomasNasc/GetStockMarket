import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../pages";
import "@testing-library/jest-dom";
import Input_Button from "../components/Input_Button";
describe("Lista de Usuarios", () => {
  test("Verifica se o card de adicionar consulta esta disponivel", () => {
    render(<Home />);

    const cardAdd = screen.getByText("+");

    expect(cardAdd).toBeInTheDocument();
  });
  test("ao clicar muda para a janela de consulta", async () => {
    render(<Home />);
    const button = screen.getByText("+");
    fireEvent.click(button);
    await waitFor(() => {
      const inputs = screen.getByPlaceholderText("Symbol...");
      expect(inputs).toBeInTheDocument();
    });
  });
  test("Erro ao inserir valor vazio", async () => {
    render(<Home />);
    const button = screen.getByText("+");
    fireEvent.click(button);
    await waitFor(() => {
      const inputs = screen.getByPlaceholderText("Symbol...");
      expect(inputs).toBeInTheDocument();
    });

    const buttonSubmit = screen.getByText("Consultar");
    fireEvent.click(buttonSubmit);
    await waitFor(() => {
      const message = screen.getByText("Request failed with status code 400");
      expect(message).toBeInTheDocument();
    });
  });
  test("abre a janela de consulta e CLica no x para fecha", async () => {
    render(<Home />);
    const button = screen.getByText("+");
    fireEvent.click(button);
    const inputs = screen.getByPlaceholderText("Symbol...");
    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(inputs).not.toBeInTheDocument();
    });
  });
  const setup = () => {
    const utils = render(<Home />);
    const input = screen.getByPlaceholderText("Symbol...");
    return {
      input,
      ...utils,
    };
  };
  test("Realiza uma consulta com sucesso", async () => {
    render(<Home />);

    const button = screen.getByText("+");
    fireEvent.click(button);
    const inputs = screen.getByPlaceholderText("Symbol...");
    const { input } = setup();
    fireEvent.change(input, { target: { value: "PETR4" } });
    expect(input.value).toBe("PETR4");
    const buttonSubmit = screen.getByText("Consultar");
    fireEvent.click(buttonSubmit);
    await waitFor(() => {
      const testSymbol = screen.getAllByText("PETR4");
      expect(inputs).not.toBeInTheDocument();
      expect(testSymbol[0]).toBeInTheDocument();
    });
  });
  test("abre a janela, faz uma pesquisa bem sucedida e fecha a que foi consulta aberta", async () => {
    render(<Home />);

    const button = screen.getByText("+");
    fireEvent.click(button);
    const inputs = screen.getByPlaceholderText("Symbol...");
    const { input } = setup();
    fireEvent.change(input, { target: { value: "PETR4" } });
    expect(input.value).toBe("PETR4");
    const buttonSubmit = screen.getByText("Consultar");
    fireEvent.click(buttonSubmit);
    await waitFor(() => {
        const testSymbol = screen.getAllByText("PETR4");
      expect(inputs).not.toBeInTheDocument();
      expect(testSymbol[0]).toBeInTheDocument();
      const closeConsulta = screen.getByText("Fechar");
      fireEvent.click(closeConsulta);
      expect(inputs).not.toBeInTheDocument();
      testSymbol.map((item) => expect(item).not.toBeInTheDocument());
    });

  });
});
