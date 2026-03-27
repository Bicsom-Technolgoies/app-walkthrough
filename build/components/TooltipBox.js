import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
export const TooltipBox = ({ step, currentIndex, totalSteps, isFirstStep, isLastStep, onNext, onPrev, onStop, }) => (<View style={styles.card}>
    {/* Header */}
    <View style={styles.header}>
      <View style={styles.stepBadge}>
        <Text style={styles.stepBadgeText}>
          {currentIndex + 1} / {totalSteps}
        </Text>
      </View>
      <TouchableOpacity onPress={onStop} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Text style={styles.closeBtn}>✕</Text>
      </TouchableOpacity>
    </View>

    {step.title ? <Text style={styles.title}>{step.title}</Text> : null}
    <Text style={styles.body}>{step.text}</Text>

    {/* Progress dots */}
    <View style={styles.dots}>
      {Array.from({ length: totalSteps }).map((_, i) => (<View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]}/>))}
    </View>

    {/* Navigation */}
    <View style={styles.nav}>
      {!isFirstStep && (<TouchableOpacity onPress={onPrev} style={styles.prevBtn}>
          <Text style={styles.prevLabel}>← Back</Text>
        </TouchableOpacity>)}
      <View style={{ flex: 1 }}/>
      <TouchableOpacity onPress={isLastStep ? onStop : onNext} style={[styles.nextBtn, isLastStep && styles.finishBtn]}>
        <Text style={styles.nextLabel}>{isLastStep ? "Done ✓" : "Next →"}</Text>
      </TouchableOpacity>
    </View>
  </View>);
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 24,
        elevation: 12,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    stepBadge: {
        backgroundColor: "#f3f0ff",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    stepBadgeText: { color: "#7c3aed", fontSize: 12, fontWeight: "700" },
    closeBtn: { fontSize: 16, color: "#aaa", fontWeight: "700" },
    title: { fontSize: 16, fontWeight: "800", color: "#1e1235", marginBottom: 6 },
    body: { fontSize: 14, color: "#555", lineHeight: 21, marginBottom: 16 },
    dots: { flexDirection: "row", gap: 5, marginBottom: 16, alignSelf: "center" },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#e0d7ff" },
    dotActive: { width: 18, backgroundColor: "#7c3aed" },
    nav: { flexDirection: "row", alignItems: "center" },
    prevBtn: { paddingVertical: 10, paddingHorizontal: 16 },
    prevLabel: { color: "#7c3aed", fontSize: 14, fontWeight: "600" },
    nextBtn: {
        backgroundColor: "#7c3aed",
        paddingVertical: 11,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    finishBtn: { backgroundColor: "#059669" },
    nextLabel: { color: "#fff", fontSize: 14, fontWeight: "700" },
});
//# sourceMappingURL=TooltipBox.js.map