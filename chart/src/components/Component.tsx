import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartEaxample() {

  const [chartData, setChartData] = useState([]);

  // fetch data from the backend
  useEffect(() => {
    fetch("http://localhost:3000/api/chart-data")
    .then((response) => response.json())
    .then((data) => {
      console.log('Data fetched from backend:', JSON.stringify(data, null, 2));
      setChartData(data);
    })
    .catch((error) => {
      console.error(`Error fetching chart data: ${error}`);
    });
  }, []);

  return (
    <>
      <Card className='bg-slate-100'>
      <CardHeader>
        <CardTitle className='text-2xl font-extralight'> Gráfico de Área - Empilhado </CardTitle>
        <CardDescription className='text-base font-extralight'> A mostrar o total de visitantes nos últimos 6 meses </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-extralight text-2xl leading-none">
              Tendência de Alta de 5,2% ao mês <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground"> Janeiro - Junho 2024 </div>
            <Button className='mt-2 bg-gray-900 text-amber-50 cursor-pointer'> Mais detalhes </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
    </>
  )
}
