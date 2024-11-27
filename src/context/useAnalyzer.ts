/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

type State = {
  tokens: string[] // Lista de tokens
  analyzer: Record<string, any>[] // Alfabeto gerado a partir dos tokens
  tokenSearch: string // String de busca de token
}

type Actions = {
  setTokenSearch: (tokenSearch: string) => void // Define a string de busca de token
  insertToken: (token: string) => void // Adiciona um novo token à lista de tokens
  removeToken: (token: string) => void // Remove um token específico da lista de tokens
  setAnalyzer: () => void // Gera o alfabeto a partir dos tokens
  resetTokens: () => void // Reseta o estado para um conjunto vazio
}

type UseAnalyzer = {
  state: State
  actions: Actions
}

// Criação de um estado global utilizando o Zustand
export const useAnalyzer = create<UseAnalyzer>((set) => ({
  state: {
    // Lista de tokens de exemplo (pode ser alterada conforme necessário)
    // tokens: [],
    tokens: ['class', 'return', 'new', 'array', 'export', 'constructor'],
    // Alfabeto gerado a partir dos tokens
    analyzer: [],
    // String de busca de token
    tokenSearch: '',
  },
  actions: {
    // Define a string de busca de token
    setTokenSearch: (tokenSearch) =>
      set((state) => ({
        state: { ...state.state, tokenSearch },
      })),
    // Adiciona um novo token à lista de tokens
    insertToken: (token) =>
      set((state) => ({
        state: { ...state.state, tokens: [...state.state.tokens, token] },
      })),
    // Remove um token específico da lista de tokens
    removeToken: (token) =>
      set((state) => ({
        state: {
          ...state.state,
          tokens: state.state.tokens.filter(
            (tokensState) => tokensState !== token,
          ),
        },
      })),
    // Gera o alfabeto a partir dos tokens
    setAnalyzer: () =>
      set((state) => ({
        state: {
          ...state.state,
          analyzer: (() => {
            // inicialização de variáveis
            const analyzer: Record<string, any>[] = [[]]
            let step = 0
            // Percorre cada token no array de tokens

            state.state.tokens.forEach((token) => {
              let currentStep = 0
              // Itera sobre cada letra no token
              token.split('').forEach((letter, letterIndex) => {
                // Verifica se o estado atual possui uma transição para a letra
                currentStep =
                  analyzer[currentStep][letter] === undefined
                    ? // Se não houver transição, cria uma nova transição e uma nova etapa
                      ((analyzer[currentStep][letter] = ++step),
                      (analyzer[step] = []),
                      step)
                    : // Se a transição já existe, atualiza a etapa atual
                      analyzer[currentStep][letter]
                // Marca o estado atual como 'end' se estivermos na última letra do token
                analyzer[currentStep].end = letterIndex === token.length - 1
              })
            })
            // Retorna o array de estados criado
            return analyzer
          })(),
        },
      })),
    // Reseta o estado para um conjunto vazio
    resetTokens: () =>
      set(() => ({
        state: {
          tokens: [],
          analyzer: [],
          tokenSearch: '',
        },
      })),
  },
}))
