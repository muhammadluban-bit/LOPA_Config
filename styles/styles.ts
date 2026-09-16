import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  navbar: {
    flexShrink: 0,
    height: 60,
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#444444",
  },
  navbarTitle: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  controls: {
    position: "absolute",
    top: 70,
    right: 10,
    zIndex: 100,
    flexDirection: "row",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 4,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000000",
  },
  canvasSection: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  canvasWrapperHorizontal: {
    flex: 1,
  },
  canvasWrapperVertical: {
    flexGrow: 1,
  },
  centeringContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30, // Keeps a nice uniform gutter around your canvas
  },
  canvas: {
    backgroundColor: "#fcfcfc",
    borderWidth: 1,
    borderColor: "#888888",
    position: "relative",
  },
  rectangle: {
    opacity: 0.7,
    backgroundColor: "steelblue",
    zIndex: 2,
  },
  configurator: {
    height: "30%",
    minHeight: 140,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    padding: 16,
  },
  configuratorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  configuratorText: {
    color: "#666666",
  },
  metaContainer: {
    marginTop: 10,
  },
  metaText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
  },
});
