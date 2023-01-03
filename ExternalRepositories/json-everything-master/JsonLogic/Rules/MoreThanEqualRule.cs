﻿using System.Text.Json;
using Json.More;

namespace Json.Logic.Rules;

[Operator(">=")]
internal class MoreThanEqualRule : Rule
{
	private readonly Rule _a;
	private readonly Rule _b;

	public MoreThanEqualRule(Rule a, Rule b)
	{
		_a = a;
		_b = b;
	}

	public override JsonElement Apply(JsonElement data, JsonElement? contextData = null)
	{
		var a = _a.Apply(data, contextData);
		var b = _b.Apply(data, contextData);

		var numberA = a.Numberify();
		var numberB = b.Numberify();

		if (numberA == null || numberB == null)
			throw new JsonLogicException($"Cannot compare {a.ValueKind} and {b.ValueKind}.");

		return (numberA >= numberB).AsJsonElement();
	}
}