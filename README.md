# Testowanie i Jakość Oprogramowania
## Projekt Gry w Warcaby

### Autor
Kacper Białas

### Temat Projektu
Implementacja Gry w Warcaby z Zestawem Testów

### Opis Projektu
Ten projekt implementuje klasyczną grę w warcaby z interfejsem webowym. Gra przestrzega standardowych międzynarodowych zasad, gdzie pionki mogą poruszać się po przekątnej i muszą zbijać pionki przeciwnika, gdy jest taka możliwość.

Główne funkcje:
- Interaktywna plansza do gry
- Podświetlanie dozwolonych ruchów
- Mechanika zbijania pionków
- Rozgrywka turowa
- Zarządzanie stanem gry
- Kompleksowe pokrycie testami

### Uruchamianie Projektu
1. Instalacja zależności:
```bash
npm install
```

2. Uruchomienie serwera deweloperskiego:
```bash
npm run dev
```

3. Uruchomienie testów:
```bash
npm run test
```

### Testy
#### Testy Jednostkowe (GameLogic.test.ts)
Znajdują się w `src/__tests__/unit/GameLogic.test.ts`:

1. Inicjalizacja Planszy:
   - Tworzenie planszy o poprawnym rozmiarze
   - Umieszczanie poprawnej liczby pionków dla każdego gracza
   - Umieszczanie pionków tylko na ciemnych polach
   - Sprawdzanie braku królów na początku gry
   - Tworzenie początkowego stanu gry z poprawnymi właściwościami

2. Walidacja Ruchów:
   - Poprawna walidacja pozycji na planszy
   - Zwracanie dozwolonych ruchów dla zwykłego pionka
   - Zwracanie dozwolonych ruchów z biciem
   - Zwracanie dozwolonych ruchów dla króla
   - Obsługa przypadków brzegowych przy walidacji ruchów

#### Testy Integracyjne (GameIntegration.test.tsx)
Znajdują się w `src/__tests__/integration/GameIntegration.test.tsx`:

1. Inicjalizacja Gry:
   - Poprawny stan początkowy gry
   - Prawidłowa liczba pionków (24)
   - Poprawne rozmieszczenie pionków dla obu graczy (po 12)

2. Podstawowe Ruchy:
   - Obsługa podstawowych ruchów pionków
   - Walidacja dozwolonych ruchów
   - Zmiana tury po wykonaniu ruchu

3. Selekcja i Deselekcja Pionków:
   - Wybór pionka i wyświetlanie dozwolonych ruchów
   - Odznaczanie pionka
   - Czyszczenie dozwolonych ruchów po deselekcji

4. Walidacja Nieprawidłowych Ruchów:
   - Blokowanie ruchów na nieprawidłowe pola
   - Zachowanie pozycji pionków po nieprawidłowym ruchu
   - Utrzymanie aktualnej tury

5. Zbijanie Pionków:
   - Poprawne wykonanie bicia
   - Usuwanie zbitego pionka
   - Aktualizacja liczby pionków po biciu

6. Zarządzanie Turami:
   - Wymuszanie kolejności graczy
   - Blokowanie ruchów w niewłaściwej turze
   - Prawidłowa zmiana tury po ruchu

7. Podświetlanie Ruchów:
   - Wyświetlanie dozwolonych ruchów po wyborze pionka
   - Walidacja, że ruchy są tylko po przekątnej
   - Sprawdzanie, że ruchy są na ciemnych polach

8. Spójność Stanu Gry:
   - Utrzymanie spójności stanu po wielu ruchach
   - Zachowanie liczby pionków
   - Poprawność stanu gry

9. Obsługa Kolejnych Tur:
   - Prawidłowa sekwencja tur graczy
   - Poprawna zmiana aktualnego gracza
   - Zachowanie własności pionków po ruchach

10. Zachowanie Własności Pionków:
    - Utrzymanie koloru pionków po wykonaniu ruchu
    - Weryfikacja własności pionków gracza 1 (czerwone)
    - Weryfikacja własności pionków gracza 2 (białe)

### Dokumentacja API
#### Zarządzanie Stanem Gry
- `initGame()`: Inicjalizuje nową grę
- `makeMove(from: Position, to: Position)`: Wykonuje ruch
- `getValidMoves(position: Position)`: Zwraca dozwolone ruchy
- `isGameOver()`: Sprawdza czy gra jest zakończona

#### Zarządzanie Planszą
- `getBoard()`: Zwraca aktualny stan planszy
- `getPiece(position: Position)`: Pobiera pionek z pozycji
- `movePiece(from: Position, to: Position)`: Przesuwa pionek

### Użyte Technologie
- React + TypeScript
- Vite
- Vitest do testowania
- TailwindCSS do stylizacji
- Lucide React dla ikon