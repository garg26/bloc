# BlocProvider Performance Tests

Integration Tests which test the performance of BlocProvider variants.

## Running the tests

```
flutter drive --target=test_driver/main.dart --driver=test_driver/driver/bloc_provider_performance_test.dart
```

## Results

**I + A**: `InheritedWidget` + `ancestorWidgetOfExactType`

**S + A**: `StatelessWidget` + `ancestorWidgetOfExactType`

**I + I**: `InheritedWidget` + `inheritFromWidgetOfExactType`

**SF + I**: `StatefulWidget` + `InheritedWidget` + `ancestorInheritedElementForWidgetOfExactType`

|                  | I + A   | S + A  | I + I  | SF + I |
|------------------|---------|--------|--------|--------|
| Avg Frame (ms)   | 1.363   | 1.159  | 1.446  | 1.145  |
| Worst Frame (ms) | 12.157  | 9.967  | 10.348 | 8.350  |

**Average across 10 runs*

For help getting started with Flutter, view our online
[documentation](https://flutter.io/).
